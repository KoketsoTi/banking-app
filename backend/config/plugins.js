module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        upload_config: {
            folder: env('CLOUDINARY_FOLDER'),
           // ... and some
        },
        actionOptions: {
          upload: {
            folder: env('CLOUDINARY_FOLDER'),
          },
          delete: {},
        },
      },
    },
    // ...

    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.gmail.com'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: '',
          defaultReplyTo: '',
        },
      },
    },
    

  });

  /*  
  
   email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.gmail.com'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: "koki.tinyane@gmail.com",
            pass: "klxpscraffdnjoze"
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: "koki.tinyane@gmail.com",
          defaultReplyTo: "koki.tinyane@gmail.com",
        },
      },
    },
  */