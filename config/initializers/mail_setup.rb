ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "sewebbdesign.se",
  :user_name            => "frasse@sewebbdesign.se",
  :password             => "GT68?vert",
  :authentication       => "plain",
  :enable_starttls_auto => true
}
#ActionMailer::Base.delivery_method = :sendmail
ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = true
ActionMailer::Base.default_url_options[:host] = "localhost:3000"
ActionMailer::Base.default_charset = "utf-8"