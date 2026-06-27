"""initial schema

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-06-27 00:00:00.000000
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "0001_initial_schema"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "kanji",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("character", sa.String(), nullable=False),
        sa.Column("meanings", sa.Text(), nullable=False),
        sa.Column("onyomi", sa.Text(), nullable=True),
        sa.Column("kunyomi", sa.Text(), nullable=True),
        sa.Column("hiragana_reading", sa.Text(), nullable=True),
        sa.Column("pitch_accent", sa.Text(), nullable=True),
        sa.Column("han_viet", sa.Text(), nullable=True),
        sa.Column("jlpt_level", sa.String(length=16), nullable=True),
        sa.Column("frequency", sa.Integer(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
    )
    op.create_index(op.f("ix_kanji_character"), "kanji", ["character"], unique=True)

    op.create_table(
        "vocabulary",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("writing", sa.String(), nullable=False),
        sa.Column("reading", sa.Text(), nullable=True),
        sa.Column("meaning", sa.Text(), nullable=False),
        sa.Column("han_viet", sa.Text(), nullable=True),
        sa.Column("level", sa.String(length=32), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
    )
    op.create_index(op.f("ix_vocabulary_writing"), "vocabulary", ["writing"], unique=False)

    op.create_table(
        "edges",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("source_type", sa.String(length=32), nullable=False),
        sa.Column("source_id", sa.Integer(), nullable=False),
        sa.Column("target_type", sa.String(length=32), nullable=False),
        sa.Column("target_id", sa.Integer(), nullable=False),
        sa.Column("relation_type", sa.String(length=64), nullable=False),
        sa.Column("weight", sa.Float(), nullable=False),
        sa.Column("note", sa.Text(), nullable=True),
    )

    op.create_table(
        "examples",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("vocabulary_id", sa.Integer(), nullable=False),
        sa.Column("japanese_sentence", sa.Text(), nullable=False),
        sa.Column("reading", sa.Text(), nullable=True),
        sa.Column("meaning_vi", sa.Text(), nullable=False),
        sa.ForeignKeyConstraint(["vocabulary_id"], ["vocabulary.id"]),
    )


def downgrade() -> None:
    op.drop_table("examples")
    op.drop_table("edges")
    op.drop_index(op.f("ix_vocabulary_writing"), table_name="vocabulary")
    op.drop_table("vocabulary")
    op.drop_index(op.f("ix_kanji_character"), table_name="kanji")
    op.drop_table("kanji")
