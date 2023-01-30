import { makeAutoObservable } from "mobx"
import { News } from "../core/types/News"
import { getNewsFromServer } from "../core/utils/getNewsFromServer"

class NewsStore {
  news: News[] = []
  
  constructor() {
    makeAutoObservable(this)
  }

  async fetchNews() {
    const newsList = await getNewsFromServer()

    if(newsList !== null) {
      this.setNews(newsList)
    }
  }

  setNews(news: News[]) {
    this.news = news
  }
}

export default NewsStore