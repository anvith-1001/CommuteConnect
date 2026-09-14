# Supabase database certificate

Download your project’s server root certificate from Supabase → Database Settings → SSL Configuration.

Save the downloaded file here as `prod-supabase.cer`. The backend `.env` references it with:

```dotenv
DATABASE_SSL=true
DATABASE_SSL_CA_FILE=./certs/prod-supabase.cer
```

Both migrations and the NestJS server use this certificate with certificate verification enabled. For Render, upload the certificate as a Secret File and set `DATABASE_SSL_CA_FILE` to its mounted path (for example `/etc/secrets/prod-supabase.cer`).

The certificate is public trust material, not a database password. It must come from your authenticated Supabase dashboard, not from an unverified connection.