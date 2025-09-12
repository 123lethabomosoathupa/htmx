from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import FileExtensionValidator


class User(AbstractUser):
    """Custom user model (inherits from Django's AbstractUser)."""
    pass


class Contact(models.Model):
    """Stores a contact belonging to a user."""
    document = models.FileField(
        upload_to='contact_docs/',
        validators=[FileExtensionValidator(['pdf', 'docs', 'docx', 'txt'])],
        blank=True,
        null=True
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='contacts'  # allows request.user.contacts.all()
    )

    class Meta:
        unique_together = ('user', 'email')
        ordering = ['-created_at']  # newest contacts first

    def __str__(self):
        return f"{self.name} <{self.email}>"