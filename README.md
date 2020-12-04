## Fullstack repo


## Rabbit MQ cluster setup
- create 3 VMs with different zones
- public ports 5672, 15672 must be open for any ip
- set all access for 172.31.0.0/16 (from VPC)
- Install script from https://www.rabbitmq.com/install-debian.html
```bash
bash <(curl -Ls https://gist.githubusercontent.com/lstkz/9a0673a966fd774f557bbac7e9503a60/raw/02811ceda2674c64e78743c2b03d73c70d799a8e/install.sh)
```
- in all VMs run
```bash
sudo rabbitmq-plugins enable rabbitmq_management 
```
- check erlang cookie
```bash
sudo cat /var/lib/rabbitmq/.erlang.cookie
```
- set this cookie to VM2 and VM3
- in V2 and VM3 run
```bash
  sudo systemctl restart rabbitmq-server.service
  sudo rabbitmqctl stop_app
  ## use hostname from VM1 not IP
  sudo rabbitmqctl join_cluster rabbit@ip-xxx-yy-aa-ccc
  sudo rabbitmqctl start_app
``` 
- in V1 run
```bash
  ## add user
  sudo rabbitmqctl add_user mq ADMIN_PASSWORD
  sudo rabbitmqctl set_user_tags mq administrator
  sudo rabbitmqctl set_permissions -p / mq ".*" ".*" ".*"

  ## set policy
  sudo rabbitmqctl set_policy ha-all ".*" '{"ha-mode":"all"}'
```