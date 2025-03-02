/**
 * @file This file contains the query to generate search results based on query and filters
 *
 * Note: for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import { PipelineStage } from 'mongoose';

const ALUMNI_PERSONAL_DETAILS = 'alumnipersonaldetails';
const ALUMNI_EDUCATION_DETAILS = 'alumnieducationdetails';
const ALUMNI_CONTACT_DETAILS = 'alumnicontactdetails';
const ALUMNI_PROFESSIONAL_DETAILS = 'alumniprofessionaldetails';

export const generateSearchResultsPipeline = (
  query: string,
  filters: {
    branch?: string;
    degree?: string;
    year?: string;
    company?: string;
    designation?: string;
    location?: string;
  },
  pagination: {
    limit: number;
    offset: number;
  },
): PipelineStage[] => {
  return [
    // Match only verified alumni
    { $match: { verificationStatus: 'verified' } },
    // Lookup personal, contact, education and professional details
    {
      $lookup: {
        from: ALUMNI_PERSONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'personal',
      },
    },
    { $unwind: { path: '$personal', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: ALUMNI_CONTACT_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'contact',
      },
    },
    { $unwind: { path: '$contact', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: ALUMNI_EDUCATION_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'education',
      },
    },
    { $unwind: { path: '$education', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: ALUMNI_PROFESSIONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'professional',
      },
    },
    { $unwind: { path: '$professional', preserveNullAndEmptyArrays: true } },
    // Match filters
    createFiltersMatchStage(filters),
    // Match query
    {
      $match: {
        $or: [
          { 'personal.name': { $regex: query, $options: 'i' } },
          { 'personal.alias': { $regex: query, $options: 'i' } },
        ],
      },
    },
    // pagination
    { $sort: { 'personal.name': 1 } },
    { $skip: pagination.offset },
    { $limit: pagination.limit },
    // project only required fields
    {
      $project: {
        ucn: 1,
        account: 1,
        name: '$personal.name',
        profilePicture: '$personal.profilePicture',
        degree: '$education.degree',
        branch: '$education.branch',
        yearOfGraduation: '$education.yearOfGraduation',
        currentCompany: '$professional.currentCompany',
        designation: '$professional.designation',
      },
    },
  ];
};

const createFiltersMatchStage = (filters: {
  branch?: string;
  degree?: string;
  year?: string;
  company?: string;
  designation?: string;
  location?: string;
}): PipelineStage.Match => {
  const match: Record<string, unknown> = {};

  if (filters.branch) {
    match['education.branch'] = filters.branch;
  }

  if (filters.degree) {
    match['education.degree'] = filters.degree;
  }

  if (filters.year) {
    match['education.yearOfGraduation'] = parseInt(filters.year, 10);
  }

  if (filters.company) {
    match['professional.currentCompany'] = filters.company;
  }

  if (filters.designation) {
    match['professional.designation'] = filters.designation;
  }

  if (filters.location) {
    match['$or'] = [
      { 'contact.city': filters.location },
      { 'contact.state': filters.location },
      { 'contact.country': filters.location },
    ];
  }

  return { $match: match };
};
