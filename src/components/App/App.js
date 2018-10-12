import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import List from 'components/List';
import Loader from 'components/Loader';
import { colorsDark } from 'styles/palette';

import { Wrapper, Title } from './styles';

class App extends Component {
  componentDidMount() {
      this.props.fetchStoriesFirstPage();
  }

  fetchStories = () => {
      const { storyIds, page, fetchStories, isFetching } = this.props;
      if (!isFetching) fetchStories({ storyIds, page });
  }

  render() {
    const { stories, hasMoreStories } = this.props;
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
          <Wrapper>
            <Title>HackerNews Reader</Title>
            <InfiniteScroll
                dataLength={stories.length}
                next={this.fetchStories}
                hasMore={hasMoreStories}
                loader={<Loader />}
                style={{
                    height: '100%',
                    overflow: 'visible',
                }}
            >
                <List stories={stories} />
            </InfiniteScroll>
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
