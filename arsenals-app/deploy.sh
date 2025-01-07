source .dep.env
echo IP:$SERVER_IP
echo Port:$SERVER_PORT

scp -r -P $SERVER_PORT ./dist/* george@$SERVER_IP:/var/www/arsenals/