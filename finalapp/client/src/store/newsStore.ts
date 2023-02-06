import { makeAutoObservable } from "mobx"
import { News } from "../core/types/News"
import ServerApi from "../core/utils/serverApi"

class NewsStore {
  news: News[] = []
  
  constructor(private readonly serverApi: ServerApi) {
    makeAutoObservable(this)
  }

  async fetchNews(): Promise<void> {
    const newsList = await this.serverApi.getNewsFromServer()

    if(newsList !== null) {
      this.setNews(newsList)
    }
  }

  async getNewsById(id: string): Promise<News | null> {
    const news = this.serverApi.getNewsFromServerById(id)
    return news
  }

  setNews(news: News[]) {
    this.news = news
  }
}

export default NewsStore