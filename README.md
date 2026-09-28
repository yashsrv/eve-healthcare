For ease of assessment, Postman docs with assumptions are here: https://www.postman.com/yashsrv12/eve-healthcare/documentation/3uomcux/eve-healthcare-apis

How to run locally?
1. Clone this repo: `git clone https://github.com/yashsrv/eve-healthcare`
2. Run containers: `docker compose up -d --build`
3. Check your running containers: `docker ps`

Note: Make sure you have docker installed with compose plugin and your engine is running.

What would I do if I had more time?
1. Decouple the webhook logic to background workers with retry logic (BullMQ)
2. Use rate limiting at proxy level (Nginx)
3. Add pagination in /centres endpoint

NOTE: Each line of code and design decision is done by me, No AI.

## DB Diagram

<img width="471" height="1040" alt="er" src="https://github.com/user-attachments/assets/52f3a9c4-9051-44c0-a22e-e3c9046c3299" />
