from django.shortcuts import render

from django.http import JsonResponse

from .models import Serie
# Create your views here.

def listar_series(request):
    serie = list(Serie.objects.values())
    return JsonResponse(serie, safe=False)