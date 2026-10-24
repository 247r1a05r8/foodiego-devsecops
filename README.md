# FoodieGo - DevSecOps CI/CD (Academic Mini Project)

A B.Tech DevOps/DevSecOps mini project: **FoodieGo**, a fictional food-delivery
front end, containerized with Docker and delivered through a GitHub Actions
pipeline with integrated security scanning (Gitleaks for secrets, Trivy for
container vulnerabilities).

## Team

- Akula Ajay Kumar
- Srikar
- Sanjay Kumar

Computer Science and Engineering, CMR Technical Campus (Semester V).

## What is in this repository

| Path | Status |
|---|---|
| `Dockerfile` | Complete - nginx:alpine image serving the static front end (from the project report) |
| `nginx.conf` | Complete - Nginx server configuration (from the project report) |
| `.github/workflows/devsecops-ci-cd.yml` | Complete - the full CI/CD workflow (from the project report) |
| `src/` | **Rebuilt 2026-10-24** - new minimal front end matching the report's description. The original full front-end source was not preserved, so this is newly written code, NOT the original college submission |
| `excerpts/` | Original front-end fragments exactly as printed in the project report (Appendix A) |

## Pipeline stages

1. **Gitleaks** secret scan on every push / pull request to `main`
2. **Docker build** of the FoodieGo image
3. **Trivy** vulnerability scan (CRITICAL, HIGH) on the built image
4. **Smoke test** - run the container and check the page responds
5. **Deployment (simulated)** - logs success; this academic project uses no
   paid hosting, so the final step is a simulated deploy

## Honest scope notes

- FoodieGo is a fictional demo front end; it is not affiliated with any real
  food-delivery brand. All restaurant names and data are fictional.
- No real authentication, payments, backend, or database - intentionally out of
  scope for this academic project.
- The rebuilt `src/` front end is a static demo (search, filters, demo cart).
- The workflow's Trivy step pin was updated from the report's `0.24.0` (which
  no longer resolves on GitHub) to `v0.36.0`; everything else in the workflow
  is unchanged from the report.
- Verified run: the full pipeline (Gitleaks scan, Docker build, Trivy scan,
  container smoke test) ran green on GitHub Actions on 2026-10-24.

## Run locally

Open `src/index.html` in a browser, or with Docker:

```bash
docker build -t foodiego .
docker run -p 8080:80 foodiego
```
