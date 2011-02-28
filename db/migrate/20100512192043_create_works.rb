class CreateWorks < ActiveRecord::Migration
  def self.up
    create_table :works do |t|
      t.string :title
      t.text :description
      t.boolean :draft
      t.boolean :finished
      t.boolean :paid
      t.string :url
      t.references :user
      t.string :wtype
      t.timestamps
    end
  end

  def self.down
    drop_table :works
  end
end
