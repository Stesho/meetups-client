const users = [
  {
    id: 1,
    name: 'User1',
  },
  {
    id: 2,
    name: 'User2',
  },
];

const articles = [
  {
    id: 1,
    name: 'Article1',
    authorId: 1,
  },
  {
    id: 2,
    name: 'Article2',
    authorId: 1,
  },
];

const comments = [
  {
    id: 1,
    articleId: 1,
    userId: 1,
    text: 'comment text',
  },
  {
    id: 2,
    articleId: 1,
    userId: 2,
    text: 'comment text 1',
  },
];

const fetchUser = (id) => {
  const user = users.find(item => item.id === id);
  if(user) {
    return Promise.resolve(user);
  }
  return Promise.reject(new Error('Invalid id'));
};

// TODO: use Promise constructor - new Promise((resolve, reject) => {...})
const fetchArticle = (articleId, withComments = false) => {
  return new Promise((resolve, reject) => {
    const article = articles.find(item => item.id === articleId);
    if(article) {
      const commentsText = withComments ? comments.filter(item => item.articleId === article.id).map(item => item.text) : [];
      resolve({...article, comments: commentsText});
    }
    reject(new Error('Invalid article id'));
  });
};

const fetchComments = (articleId, withUser = false) => {
  return new Promise((resolve, reject) => {
    let commentsText = comments.filter(item => item.articleId === articleId);
    if(commentsText.length > 0) {
      if(withUser) {
        commentsText = commentsText.map(item => ({...item, user: item.userId ? item.name : 'anonymous'}));
      }
      resolve(commentsText);
    }
    reject(new Error('Inavlid article id'));
  });
};

(async function() {
  try {
    const user = await fetchUser(1);
    const article = await fetchArticle(1, true);
    const comments = await fetchComments(1, true);
    console.log(user.name);
    console.log(article.comments);
    console.log(comments);
  }
  catch(err) {
    console.log(err);
  }
})();