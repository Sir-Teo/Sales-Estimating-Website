# Generated by Django 4.2.13 on 2024-07-19 18:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ml_api", "0002_savedprediction_project_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="savedprediction",
            name="project_name",
            field=models.CharField(max_length=255),
        ),
    ]
