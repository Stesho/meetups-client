import { makeAutoObservable } from 'mobx';
import { News } from '../core/types/News';
import ServerApi from '../core/utils/serverApi/serverApi';

class NewsStore {
  news: News[] = [];

  constructor(private readonly serverApi: ServerApi) {
    makeAutoObservable(this);
  }

  async addNews(news: News): Promise<void> {
    const response = await this.serverApi.sendCreatedNewsToServer(news);

    if (response !== null) {
      this.news.push(response);
    }
  }

  async getNewsById(id: string): Promise<News | null> {
    const news = await this.serverApi.getNewsFromServerById(id);
    return news;
  }

  async fetchNews(): Promise<void> {
    const newsList = await this.serverApi.getNewsFromServer();

    if (newsList !== null) {
      this.setNews(newsList);
    }
  }

  setNews(news: News[]) {
    this.news = news;
  }
}

export default NewsStore;
