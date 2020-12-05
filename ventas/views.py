from django.shortcuts import render


def dashboard(request):
    template = 'ventas/dashboard.html'

    context = {
    }

    return render(request, template, context)
