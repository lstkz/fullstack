

```

# create user
sudo useradd coder

# install nvm, node, yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
. /home/ubuntu/.bashrc
nvm install v14
npm i -g yarn

# install typescript
npm i -g typescript ts-node

# install caddy
echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
    | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
sudo apt update
sudo apt install caddy

# install nginx
sudo apt update
sudo apt install -y nginx

```