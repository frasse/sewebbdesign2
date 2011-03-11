class ContactsController < ApplicationController
	# GET /contacts
	# GET /contacts.xml
	def index
		@contacts = Contact.all

		respond_to do |format|
			format.html # index.html.erb
			format.xml { render :xml => @contacts }
			format.js { render :layout => false }
		end
	end

	# GET /contacts/1
	# GET /contacts/1.xml
	def show
		@contact = Contact.find(params[:id])

		respond_to do |format|
			format.html # show.html.erb
			format.xml { render :xml => @contact }
			format.js { render :layout => false }
		end
	end

	def get_attr
		@contact = Contact.find(params[:id])
		render :text => @contact.send(params[:attr])
	end

	# GET /contacts/new
	# GET /contacts/new.xml
	def new
		@contact = Contact.new

		respond_to do |format|
			format.html # new.html.erb
			format.xml { render :xml => @contact }
			format.js { render :partial => 'form' }
		end
	end

	# GET /contacts/1/edit
	def edit
		@contact = Contact.find(params[:id])
	end

	# POST /contacts
	# POST /contacts.xml
	def create
		@contact = Contact.new(params[:contact])

		respond_to do |format|
			if @contact.save
				format.html { redirect_to(@contact, :notice => 'Contact was successfully created.') }
				format.xml { render :xml => @contact, :status => :created, :location => @contact }
				format.js { head :ok }
			else
				format.html { render :action => "new" }
				format.xml { render :xml => @contact.errors, :status => :unprocessable_entity }
				format.js { head :bad_request}
			end
		end
	end

	# PUT /contacts/1
	# PUT /contacts/1.xml
	def update
		@contact = Contact.find(params[:id])

		respond_to do |format|
			if @contact.update_attributes(params[:contact])
				format.html { redirect_to(@contact, :notice => 'Contact was successfully updated.') }
				format.xml { head :ok }
				format.js { head :ok }
			else
				format.html { render :action => "edit" }
				format.xml { render :xml => @contact.errors, :status => :unprocessable_entity }
			end
		end
	end

	# DELETE /contacts/1
	# DELETE /contacts/1.xml
	def destroy
		@contact = Contact.find(params[:id])
		@contact.destroy

		respond_to do |format|
			format.html { redirect_to(contacts_url) }
			format.xml { head :ok }
		end
	end
end
