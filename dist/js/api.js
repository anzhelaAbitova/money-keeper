class Api {
    init = async () => {
        this.register();
        let reg = await this.posts();
        console.log(reg)
    }
    login = async () => {
        let user = {
            email: 'b@o',
            password: 'bo'
          };
          
          let response = await fetch('https://money-keeper21.herokuapp.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          });
          console.log(response)
          let result = await response.json();
          console.log(result);
    }
    register = async () => {
        let user = {
            name: 'John',
            email: 'smith@n',
            password: 'query'
        };
        
        let response = await fetch('https://money-keeper21.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        console.log(response)
        return await response.json();
    }
    user = async () => {
        try {
            let response = await fetch('https://money-keeper21.herokuapp.com/user');
            let data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    post = async () => {
        let post = {
            number: 4,
            work: 'web-design',
            contractor: 'ann',
            cost: 344,
            income: 'on',
            regular: 'on'
        };
        
        let response = await fetch('https://money-keeper21.herokuapp.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        });
        console.log(response)
        return await response.json();
    }
    posts = async () => {
        try {
            let response = await fetch('https://money-keeper21.herokuapp.com/posts');
            let data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

const api = new Api();
api.init();