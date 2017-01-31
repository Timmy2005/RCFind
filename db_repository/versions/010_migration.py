from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
rctrack = Table('rctrack', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('name', VARCHAR),
    Column('lat', DECIMAL),
    Column('lng', DECIMAL),
    Column('phone', VARCHAR),
    Column('email', VARCHAR),
    Column('type', VARCHAR),
)

rctrack = Table('rctrack', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('name', String),
    Column('lat', DECIMAL),
    Column('lng', DECIMAL),
    Column('phone', String),
    Column('type', String),
    Column('address', String),
    Column('website', String),
    Column('tags', String),
    Column('changes', String),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['rctrack'].columns['email'].drop()
    post_meta.tables['rctrack'].columns['address'].create()
    post_meta.tables['rctrack'].columns['changes'].create()
    post_meta.tables['rctrack'].columns['tags'].create()
    post_meta.tables['rctrack'].columns['website'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['rctrack'].columns['email'].create()
    post_meta.tables['rctrack'].columns['address'].drop()
    post_meta.tables['rctrack'].columns['changes'].drop()
    post_meta.tables['rctrack'].columns['tags'].drop()
    post_meta.tables['rctrack'].columns['website'].drop()
