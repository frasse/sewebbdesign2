module ApplicationHelper
def gravatar(user, size = 512)

      email = user.email.downcase
      hash = Digest::MD5.hexdigest(email)            
      image_tag "http://www.gravatar.com/avatar/#{hash}?s=#{size}&r=pg&d=mm"
end
end
