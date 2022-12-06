describe('async', () => {
  // Test basic promise functionality. You don't need to write you own implementation, just test native Promise.
  describe('Promise.prototype', () => {
    describe('then', () => {
      it('calls first passed callback to then if promise is fulfilled', async () => {
        const fn = jest.fn();

        await Promise.resolve().then(fn);
        expect(fn).toBeCalled();
      });

      it('calls first passed callback to then if promise is fulfilled', async () => {
        const fn = jest.fn();

        await new Promise(resolve => {
          fn();
          resolve();
          fn();
        })
          .then(fn, fn)
          .then(fn);

        expect(fn).toBeCalledTimes(4);
      });

      it('calls first passed callback to then if promise is fulfilled', async () => {
        const fn = jest.fn();

        await Promise.reject().then(null, fn).then(fn);
        expect(fn).toBeCalledTimes(2);
      });
    });
  });
  
  describe('Promise.all', () => {
    it('Should return array of promises', async () => {
      const fn = jest.fn();
      jest.setTimeout(300);

      const result = await Promise.all([
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(1);
        }, 300)),
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(2);
        }, 200)),
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(3);
        }, 100))
      ])

      expect(fn).toBeCalledTimes(3);
      expect(result).toStrictEqual([1, 2, 3]);
    });
  });

  describe('Promise.race', () => {
    it('Should return first promise', async () => {
      const fn = jest.fn();
      jest.setTimeout(300);

      const result = await Promise.race([
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(1);
        }, 300)),
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(2);
        }, 200)),
        new Promise(resolve => setTimeout(() => {
          fn();
          resolve(3);
        }, 100))
      ]);

      expect(fn).toBeCalledTimes(1);
      expect(result).toStrictEqual(3);
    });
  });

  describe('Promise_all: your own implementation of Promise.all', () => {
    // Some advices https://eloquentjavascript.net/11_async.html#i_Ug+Dv9Mmsw
  });

  describe('Articles', () => {
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
    ];

    // TODO: use Promise.resolve and Promise.reject to emulate asyn behaviour
    const fetchUser = (id) => {};

    // TODO: use Promise constructor - new Promise((resolve, reject) => {...})
    const fetchArticle = (articleId, withComments = false) => {};

    const fetchComments = (articleId, withUser = false) => {};

    describe('fetchUser', () => {
      // it('fetches user by id', async () => {
      //   const user = await fetchUser(1);
      //   expect(user.name).toBe('User1');
      // });
      it.todo('rejects if user is not found');
    });

    describe('fetchArticle', () => {
      it.todo('fetches article by id');
      it.todo('rejects if article is not found');
    });

    describe('fetchComments', () => {
      it.todo('fetches comments by articleId');
      it.todo('fills user data for each comment by userId');
      it.todo('use anonymous user data if comments author is not found');
    });
  });

  describe('setTimeout vs Promise.resolve', () => {
    it.todo(
      'Promise.resolve callback should be called before setTimeout callback'
    );
  });
});
