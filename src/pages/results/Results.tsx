import React, { useEffect, useState } from 'react';

import { useResultsQuery } from '../../entities/results/api';

import * as Styled from './Results.styled';
import queryString from 'query-string';

function declOfNum(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

const Results = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const { useGetResults, isLoading, isError } = useResultsQuery();

  useEffect(() => {
    window.Telegram.WebApp.expand();

    const parsed = queryString.parse(location.search);

    if (parsed?.userid) {
      const user = Array.isArray(parsed.userid)
        ? parsed.userid[0]
        : parsed.userid;

      if (user) {
        setUserId(user);

        useGetResults({ userid: user }).then((res) => {
          setResults(res);
        });
      }
    }
  }, []);

  if (isLoading || results === null) {
    return (
      <Styled.Wrapper>
        <Styled.LoaderWrapper>
          <Styled.Loader></Styled.Loader>
        </Styled.LoaderWrapper>
      </Styled.Wrapper>
    );
  }

  if (isError) {
    return <Styled.Wrapper></Styled.Wrapper>;
  }

  const formatCount = (count: number) => {
    return declOfNum(count, ['балл', 'балла', 'баллов']);
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Рейтинг игроков</Styled.Title>
      <Styled.Current>
        <Styled.Points>Мои баллы {results.user.score}</Styled.Points>
        <Styled.Gift>
          {results?.user?.gift
            ? results.user.gift
            : 'Классные результаты — впереди! Играйте и получайте баллы'}
        </Styled.Gift>
      </Styled.Current>
      <Styled.List>
        {results.top.length > 0 ? (
          results.top.map((item: any, index: number) => {
            return (
              <Styled.Item key={item.uuid}>
                <Styled.Position>#{index + 1}</Styled.Position>
                <Styled.Prize>{item.gift}</Styled.Prize>
                <Styled.Score>
                  {item.score} {formatCount(item.score)}
                </Styled.Score>
              </Styled.Item>
            );
          })
        ) : (
          <Styled.Empty>Никто еще не играл</Styled.Empty>
        )}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default Results;
