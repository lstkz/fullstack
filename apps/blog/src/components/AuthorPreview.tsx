import * as React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import * as DateFns from 'date-fns'
import locale from 'date-fns/locale/pl'
import { graphql, useStaticQuery } from 'gatsby'
import { Theme } from '../Theme'

interface AuthorPreviewProps {
  className?: string
  date: string
}

const Avatar = styled.div`
  border: 2px solid ${Theme.primary};
  border-radius: 50%;
  width: 46px;
  height: 46px;
  img {
    border-radius: 50%;
  }
`

const Right = styled.div`
  margin-left: 12px;
`

const WhiteBorder = styled.div`
  border: 1px solid white;
  border-radius: 50%;
  width: 42px;
  height: 42px;
`
const Name = styled.div`
  font-weight: 500;
  font-size: 17px;
  color: ${Theme.textDark};
`
const PostedDate = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${Theme.textLight};
`

const _AuthorPreview = (props: AuthorPreviewProps) => {
  const { className, date } = props
  const data = useStaticQuery(graphql`
    query AuthorPreviewQuery {
      avatar: file(absolutePath: { regex: "/me_new.jpg/" }) {
        childImageSharp {
          fixed(width: 40, height: 40, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const name = 'Łukasz Sentkiewicz'

  const avatar = data?.avatar?.childImageSharp?.fixed
  return (
    <div className={className}>
      <Avatar>
        <WhiteBorder>
          <Image fixed={avatar} alt={name} />
        </WhiteBorder>
      </Avatar>
      <Right>
        <Name>{name}</Name>
        <PostedDate>
          {DateFns.format(new Date(date), 'dd MMM YYY', {
            locale,
          })}
        </PostedDate>
      </Right>
    </div>
  )
}

export const AuthorPreview = styled(_AuthorPreview)`
  display: flex;
  margin-top: 15px;
`
