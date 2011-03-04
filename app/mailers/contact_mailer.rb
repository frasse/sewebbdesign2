class ContactMailer < ActionMailer::Base
	default :from => "frasse@sewebbdesign.se"

	def contact_mail(email)
		@email= email
		attachments["rails.png"] = File.read("#{Rails.root}/public/images/rails.png")
		mail(:to => "Andreas Franzen <frasse@sewebbdesign.se>", :subject => "Kund kontakt")
	end

	def site_request_mail(email)
		@email= email
		attachments["rails.png"] = File.read("#{Rails.root}/public/images/rails.png")
		mail(:to => "Andreas Franzen <frasse@sewebbdesign.se>", :subject => "Kund kontakt")
	end
end