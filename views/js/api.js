class Api {
    init = async () => {
        //let log = await this.register();
        //let reg = await this.posts();
        //console.log(log)
        //console.log(reg)
    }
    login = async () => {
        try {
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
              return response.json();  
        } catch (err) {
            return console.log(err)
        }
    }
    register = async () => {
        try {
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
        } catch (err) {
            console.log(err)
        }
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
        try {
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
        } catch (err) {
            console.log(err);
        }
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
module.exports = api;