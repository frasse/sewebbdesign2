# -*- coding: utf-8 -*-
class PagesController < ApplicationController
  def index
  @title = "Vi hjälper ditt företag att synas"
  @page = ""
    respond_to do |format|
      #format.html # new.html.erb
      format.html {render :action => "index"} 
      format.js {render :action => "index", :layout => false} 
    end
  end

  def product
  @page = "product"
  @title = "Vad kan vi göra för er?"
    respond_to do |format|
      format.html # new.html.erb
      format.js {render :layout => false} 
    end
  end

  def showcase
  @page = "showcase"
  @title = "Vad vi gjort."
    respond_to do |format|
      format.html # new.html.erb
      format.js {render :layout => false} 
    end
  end

  def contact
  @page = "contact"
  @title = "Kontakt"
    @users = User.all
    respond_to do |format|
      #format.html # {redirect_to root_path}
      format.html {render :action => "contact"} 
      format.js {render :action => "contact", :layout => false} 
    end
  end
  def contact_mail
    validated = true
    email = params[:email]
    if email[:message] == ""
      flash[:notice] = "Du måste fylla i ett meddelande"
      validated = false
    end
    if email[:name] == ""
      flash[:notice] = "Du måste fylla i ett namn"
      validated = false
    end
    if email[:email_address] == ""
      flash[:notice] = "Du måste fylla i en e-post adress"
      validated = false
    end
    if email[:email_address] =~ /^([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})$/i
      flash[:notice] = "Du måste fylla i en korrekt e-post adress"
      validated = false
    end
    if email[:phone] == ""
      flash[:notice] = "Du måste fylla i ett telefonnummer"
      validated = false
    end
	if validated
      if ContactMailer.contact_mail(email).deliver
        flash[:notice] = "Meddelandet är skickat"
      else
        flash[:error] = "Något gick fel"
      end
	end
	contact
  end

  def site_request_mail
    validated = true
    email = params[:email]
    if email[:name] == ""
      flash[:notice] = "Du måste fylla i ett namn"
      validated = false
    end
    if email[:email_address] == ""
      flash[:notice] = "Du måste fylla i en e-post adress"
      validated = false
    end
    if email[:email_address] =~ /^([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})$/i
      flash[:notice] = "Du måste fylla i en korrekt e-post adress"
      validated = false
    end
    if email[:phone] == ""
      flash[:notice] = "Du måste fylla i ett telefonnummer"
      validated = false
    end
	if validated
      if ContactMailer.site_request_mail(email).deliver
        flash[:notice] = "Meddelandet är skickat"
      else
        flash[:error] = "Något gick fel"
      end
    end
    index
  end
end
