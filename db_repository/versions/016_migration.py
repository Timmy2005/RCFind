from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
rc_track = Table('rc_track', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('name', String),
    Column('lat', DECIMAL),
    Column('lng', DECIMAL),
    Column('phone', String),
    Column('type', String),
    Column('address', String),
    Column('website', String),
    Column('tags', String),
    Column('changed', String),
    Column('notes', String),
)

requests = Table('requests', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('name', String),
    Column('lat', DECIMAL),
    Column('lng', DECIMAL),
    Column('phone', String),
    Column('address', String),
    Column('website', String),
    Column('notes', String),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['rc_track'].create()
    post_meta.tables['requests'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['rc_track'].drop()
    post_meta.tables['requests'].drop()
