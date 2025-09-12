from django import forms
from .models import Contact

from django.core.exceptions import ValidationError

class ContactForm(forms.ModelForm):

    name = forms.CharField(
        widget = forms.TextInput(attrs={
            'class': 'input input-bordered w-full',
            'placeholder': 'Contact Name'
        })
    )
    email = forms.EmailField(
        widget = forms.EmailInput(attrs={
            'class': 'input input-bordered w-full',
            'placeholder': 'Email Address'
        })
    )
    document = forms.FileField(
        widget = forms.FileInput(attrs={
            'class': 'file-input file-input-bordered w-full',
            
        }),
        required=False
    )

    def clean_email(self):
        email = self.cleaned_data['email']
        if Contact.objects.filter(user=self.initial.get('user'), email=email).exists():
            raise ValidationError("This email already exists")
        return  email
    def clean_name(self):
            name = self.cleaned_data['name']
            # checking whether email exists
            if Contact.objects.filter(user=self.initial.get('user'), name=name).exists():
                raise ValidationError("You already have a contact with this name.")
            return name
    class Meta:
        model = Contact
        fields = (
            'name', 'email', 'documents'
        )