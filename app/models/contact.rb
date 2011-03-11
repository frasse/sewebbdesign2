class Contact < ActiveRecord::Base
	validates :firstname, :presence => true, :length => { :within=> 3..255 }
	validates :lastname, :presence => true, :length => { :within=> 3..255 }
end
