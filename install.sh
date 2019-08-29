#!/bin/bash

# disable nm dns
cat > /etc/NetworkManager/NetworkManager.conf << EOL
[main]
plugins=ifupdown,keyfile,ofono
dns=none

[ifupdown]
managed=false
EOL

service network-manager restart

# set eth0 static ip
nmcli connection modify 'Wired connection 1' connection.autoconnect yes ipv4.method manual ipv4.addresses 192.168.0.99/24 ipv4.gateway 192.168.0.1 ipv4.dns "8.8.8.8 8.8.4.4"
nmcli con down  'Wired connection 1'
nmcli con up  'Wired connection 1'

cat > /etc/resolve.conf << EOL
nameserver 8.8.8.8
nameserver 8.8.4.4
EOL

# enable rtc
modprobe rtc-ds1307
cat > /etc/modprobe.d/matrix-blacklist.conf << EOL
blacklist adxl34x
blacklist adxl34x_i2c
blacklist bmp085
blacklist dht11
blacklist fbtft_device
blacklist leds_pwm
blacklist matrix_ads7846
blacklist matrix_gpio_int
blacklist matrix_hcsr04
blacklist matrix_ir_recv
blacklist matrix_pwm
blacklist matrix_rotary_encoder
blacklist pcf8591
# blacklist rtc_ds1307
blacklist w1-gpio
blacklist w1-gpio-board
EOL

# config tcp parameters https://colobu.com/2014/09/18/linux-tcpip-tuning/
cat >> /etc/sysctl.conf << EOL
net.ipv4.tcp_syn_retries = 1
net.ipv4.tcp_synack_retries = 1
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_intvl = 15
net.ipv4.tcp_retries2 = 5
net.ipv4.tcp_fin_timeout = 2
net.ipv4.tcp_max_tw_buckets = 36000
net.ipv4.tcp_tw_recycle = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_max_orphans = 32768
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 16384
net.ipv4.tcp_wmem = 8192 131072 16777216
net.ipv4.tcp_rmem = 32768 131072 16777216
net.ipv4.tcp_mem = 786432 1048576 1572864
net.ipv4.ip_local_port_range = 1024 65000
net.core.netdev_max_backlog = 16384
EOL
sysctl -p

# install
apt-get update
apt-get install ntpdate
apt-get install curl

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install nodejs

node -v
npm -v

npm install -g pm2
pm2 -v

cd main
npm install --production

pm2 start ./apps.json
pm2 startup
