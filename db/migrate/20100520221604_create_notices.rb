class CreateNotices < ActiveRecord::Migration
  def self.up
    create_table :notices do |t|
      t.string :title
      t.text :text
      t.references :user

      t.timestamps
    end
  end

  def self.down
    drop_table :notices
  end
end
