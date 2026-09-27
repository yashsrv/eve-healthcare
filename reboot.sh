# Use this script to delete all volumes and restart fresh containers.
docker compose down -v
docker compose up -d --build
docker logs -f api