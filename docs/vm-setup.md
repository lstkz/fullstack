

```
sudo apt update

# install nvm, node, yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
. /home/ubuntu/.bashrc
#nvm install v14.15.1
#npm i -g yarn
nvm install v12.20.0
nvm use v12

# install typescript
npm i -g typescript ts-node

# install nginx
sudo apt install -y nginx

# theia
sudo apt install -y libx11-dev libxkbfile-dev build-essential make pkg-config gcc
mkdir ~/.ide
#nvm install v12.20.0
#nvm use v12
#npm i -g yarn
yarn run download:plugins
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
ExecStart=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh && nvm use v12 && yarn start --port=8080'
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
ExecStart=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh && nvm use v12 && node /home/ubuntu/.fs/agent.js'
Restart=always

[Install]
WantedBy=default.target
EOF

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

