# Generated by Django 5.2 on 2025-04-29 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_alter_event_event_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="event_photo",
            field=models.ImageField(
                blank=True,
                default="event-photos/uncc.png",
                null=True,
                upload_to="event-photos/",
            ),
        ),
    ]
