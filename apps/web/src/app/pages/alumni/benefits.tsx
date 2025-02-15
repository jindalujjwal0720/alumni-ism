import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSearchParamState from '@/hooks/useSearchParamState';
import useSearchParam from '@/hooks/useSearchParam';
import { useMemo } from 'react';
import { AlumniFooter } from '@/features/alumni/components/footer';

interface Benefit {
  company: {
    name: string;
    logo: string;
    about: string;
  };
  offers: {
    description: string;
    tags: string[];
  }[];
  help: {
    name: string;
    url: string;
  };
}

const benefits: Benefit[] = [
  {
    company: {
      name: 'IIT Dhanbad Alumni Association',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ7kt9KQfrDnrsqSJplujymGADx_v11ucHA&s',
      about: 'Exclusive benefits for IIT Dhanbad alumni',
    },
    offers: [
      {
        description:
          'Subsidized rates for stay at the IIT Dhanbad guest house and access to Alumni house of ISMAA for events.',
        tags: ['IIT Dhanbad'],
      },
    ],
    help: {
      name: 'IIT Dhanbad Support',
      url: 'https://iitism.ac.in/',
    },
  },
  {
    company: {
      name: 'Namecheap',
      logo: 'https://education.github.com/assets/pack/logo-namecheap-7ecd22457a4ee5617490ba4cc16b1c15ee97c7ff87d5c47cea0352f7b87ab2b8.jpg',
      about: 'Affordable registration, hosting, and domain management',
    },
    offers: [
      {
        description: '1 year domain name registration on the .me TLD.',
        tags: ['Virtual Events'],
      },
      {
        description: '1 SSL certificate free for 1 year.',
        tags: ['Domains', 'Virtual Events'],
      },
    ],
    help: {
      name: 'Namecheap Support',
      url: 'https://www.namecheap.com/support/',
    },
  },
  {
    company: {
      name: 'GitHub Copilot',
      logo: 'https://logo.clearbit.com/github.com',
      about:
        'Use GitHub Copilot to get autocomplete-style suggestions from an AI pair programmer as you code.',
    },
    offers: [
      {
        description:
          "Free access to Copilot Individual while you're a student. To enable Copilot, go to your account settings and under Code, planning, and automation, select Copilot to sign up for free. Or click on the link below to claim the offer.",
        tags: ['Machine Learning & AI'],
      },
    ],
    help: {
      name: 'GitHub Copilot Support',
      url: 'https://support.github.com/',
    },
  },
  {
    company: {
      name: 'DigitalOcean',
      logo: 'https://logo.clearbit.com/digitalocean.com',
      about: 'Simple cloud hosting, built for developers',
    },
    offers: [
      {
        description: 'Enjoy $200 in platform credit for 1 year!',
        tags: ['Cloud'],
      },
    ],
    help: {
      name: 'DigitalOcean Support',
      url: 'https://www.digitalocean.com/support/',
    },
  },
];

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="text-sm space-y-4">
        <img
          src={benefit.company.logo}
          alt={benefit.company.name}
          className="h-12 mx-auto"
        />
        <div className="space-y-1">
          <h2 className="font-medium capitalize">
            About {benefit.company.name}
          </h2>
          <p className="text-foreground/80">{benefit.company.about}</p>
        </div>
        {benefit.offers.map((offer, index) => (
          <div
            key={offer.description + index}
            className="rounded-lg bg-muted/80 p-4 space-y-3"
          >
            <div className="space-y-1">
              <h3 className="font-medium">
                Offer {benefit.offers.length > 1 ? `#${index + 1}` : ''}
              </h3>
              <p className="text-foreground/80">{offer.description}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Tags</h4>
              <div className="flex gap-2 flex-wrap">
                {offer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 rounded-full border border-muted-foreground/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <p className="text-muted-foreground">
          Get help at{' '}
          <a
            href={benefit.help.url}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            {benefit.help.name}
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

const FilterActions = ({ tags }: { tags: string[] }) => {
  const [filterTag, setFilterTag] = useSearchParamState('tag');

  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={setFilterTag} value={filterTag}>
        <SelectTrigger className="min-w-40">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const BenefitsPage = () => {
  const filterTag = useSearchParam('tag');
  const tags = useMemo(() => {
    const allTags: string[] = [];
    benefits.forEach((benefit) => {
      benefit.offers.forEach((offer) => {
        offer.tags.forEach((tag) => {
          allTags.push(tag);
        });
      });
    });
    return [...new Set(allTags)];
  }, []);
  const filteredBenefits = useMemo(() => {
    if (filterTag === 'all' || !filterTag) {
      return benefits;
    }

    return benefits.filter((benefit) =>
      benefit.offers.some((offer) => offer.tags.includes(filterTag)),
    );
  }, [filterTag]);

  return (
    <div>
      <div className="container p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium">Benefits</h1>
            <FilterActions tags={tags} />
          </div>
          <p className="text-muted-foreground">
            Check out these exclusive offers from our partners!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBenefits.map((benefit, index) => (
            <BenefitCard key={benefit.company.name + index} benefit={benefit} />
          ))}
        </div>
      </div>
      <AlumniFooter />
    </div>
  );
};

export default BenefitsPage;
