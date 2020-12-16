

```
sudo apt update

# install nvm, node, yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
. /home/ubuntu/.bashrc
nvm install v14.15.1
npm i -g yarn 

# install typescript
npm i -g typescript ts-node

# install nginx
sudo apt install -y nginx

# theia
sudo apt install -y libx11-dev libxkbfile-dev build-essential make pkg-config gcc
mkdir ~/.ide
cd ~/.ide
git clone https://github.com/fullstackpl/theia .
yarn
yarn run build:prod
# yarn run start --hostname=0.0.0.0 --port=8080

sudo tee /etc/systemd/system/theia.service <<EOF
[Unit]
Description=theia
After=network.target

[Service]
WorkingDirectory=/home/ubuntu/.ide
User=ubuntu
Type=simple
Environment=PATH=/home/ubuntu/.nvm/versions/node/v14.15.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/home/ubuntu/.nvm/versions/node/v14.15.1/bin/yarn start --port=8080
Restart=always

[Install]
WantedBy=default.target
EOF

sudo systemctl disable --now theia
sudo systemctl enable --now theia

# journalctl -u theia

# fs service
mkdir ~/.fs

# your machine
scp -i ~/Desktop/test.pem dist/agent.js ubuntu@18.192.120.45:/home/ubuntu/.fs/agent.js


# create linux service

sudo tee /etc/systemd/system/fs-agent.service <<EOF
[Unit]
Description=fs-agent
After=network.target

[Service]
User=ubuntu
Type=simple
Environment=PATH=/home/ubuntu/.nvm/versions/node/v14.15.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/home/ubuntu/.nvm/versions/node/v14.15.1/bin/node /home/ubuntu/.fs/agent.js
Restart=always

[Install]
WantedBy=default.target
EOF

sudo systemctl disable --now fs-agent
sudo systemctl enable --now fs-agent

# remove service
# sudo systemctl disable fs-agent
# sudo systemctl stop fs-agent
# sudo systemctl restart fs-agent
# see logs
# journalctl -u fs-agent
# sudo systemctl status fs-agent

# clean history
history -c
```

