#class RegistrationsController < Devise::RegistrationsController
class RegistrationsController < ApplicationController
	include Devise::Controllers::InternalHelpers
	before_filter :authenticate_user!

    def new
		build_resource({})
		render_with_scope :new
	end

	def create
    build_resource

    if resource.save
      set_flash_message :notice, :signed_up
	  redirect_to :controller => 'users', :action => 'index'
#      sign_in_and_redirect(resource_name, resource)
    else
      clean_up_passwords(resource)
      render_with_scope :new
    end

  end

end
