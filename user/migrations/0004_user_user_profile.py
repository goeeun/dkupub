# Generated by Django 4.2.1 on 2023-05-29 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0003_alter_user_user_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="user_profile",
            field=models.CharField(
                blank=True, max_length=500, null=True, verbose_name="유저 프로필"
            ),
        ),
    ]