curl -v localhost:3000/api/bugs

curl -v --header 'If-None-Match: W/"b5-F1b7cwQ6h9O04csif+Wqkw"' localhost:3000/api/bugs

curl -v \
	--data '{"priority":"P3","owner":"Pieta","status":"Open","title":"New bug added via api"}' \
	http://localhost:3000/api/bugs

curl -v \
	--header 'Content-Type: application/json' \
	--data '{"priority":"P3","owner":"Pieta","status":"Open","title":"New bug added via api"}' \
	http://localhost:3000/api/bugs