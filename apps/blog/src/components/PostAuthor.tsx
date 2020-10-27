import * as React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme } from '../Theme';
import { SocialButton } from './SocialButton';

interface PostAuthorProps {
  className?: string;
}

const Avatar = styled.div`
  border: 2px solid ${Theme.primary};
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
`;

const WhiteBorder = styled.div`
  border: 4px solid white;
  border-radius: 50%;
  width: 73px;
  height: 73px;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: ${Theme.textDark};
  margin: 15px 0;
`;

const SocialIcons = styled.div`
  display: flex;
  ${SocialButton} {
    margin: 0 3px;
  }
`;

const _PostAuthor = (props: PostAuthorProps) => {
  const { className } = props;
  const data = useStaticQuery(graphql`
    query PostAuthorQuery {
      avatar: file(absolutePath: { regex: "/me_new.jpg/" }) {
        childImageSharp {
          fixed(width: 65, height: 65, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const name = 'Łukasz Sentkiewicz';

  const avatar = data?.avatar?.childImageSharp?.fixed;
  return (
    <div className={className}>
      <Avatar>
        <WhiteBorder>
          <Image fixed={avatar} alt={name} />
        </WhiteBorder>
      </Avatar>
      <Name>Autor: {name}</Name>
      <SocialIcons>
        <SocialButton type="li" />
        <SocialButton type="fb" />
        <SocialButton type="yt" />
        <SocialButton type="twitter" />
        <SocialButton type="gh" />
      </SocialIcons>
    </div>
  );
};

export const PostAuthor = styled(_PostAuthor)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 60px;
`;
