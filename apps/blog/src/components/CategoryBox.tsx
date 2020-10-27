import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import slugify from 'slugify';
import { Theme } from '../Theme';
import { ArrowIcon } from './ArrowIcon';
import { SidebarBox } from './SidebarBox';

interface CategoryBoxProps {
  className?: string;
}

interface Data {
  allMdx: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

const Gray = styled.span`
  color: ${Theme.textLight};
  margin-left: 5px;
`;

const Links = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    font-size: 18px;
    color: ${Theme.textDark};
    text-decoration: none;
    &:hover {
      &,
      ${Gray} {
        color: ${Theme.primary};
      }
    }
  }

  li + li {
    margin-top: 10px;
  }

  li a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 15px;
  }
`;

const _CategoryBox = (props: CategoryBoxProps) => {
  const { className } = props;

  const data: Data = useStaticQuery(graphql`
    query Categories {
      allMdx {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  data.allMdx.group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <SidebarBox title="Kategorie" className={className}>
      <Links>
        {data.allMdx.group.map(item => (
          <li key={item.fieldValue}>
            <Link to={`/kategoria/${slugify(item.fieldValue).toLowerCase()}`}>
              <ArrowIcon />
              {item.fieldValue} <Gray>({item.totalCount})</Gray>
            </Link>
          </li>
        ))}
      </Links>
    </SidebarBox>
  );
};

export const CategoryBox = styled(_CategoryBox)`
  display: block;
`;
