import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie


@csrf_exempt
def api_series(request):
    if request.method == "POST":
        # le o JSON e converte para numero o ano e avaliação ou da erro 400 
        try:
            dados = json.loads(request.body)
            titulo = dados["titulo"]
            plataforma = dados["plataforma"]
            ano = int(dados["ano"])
            avaliacao = float(dados["avaliacao"])
        except (ValueError, KeyError, TypeError):
            return JsonResponse(
                {"erro": "Preencha todos os campos corretamente. Ano e avaliação precisam ser números."},
                status=400,
            )

        # verifica se esta dentro do limite ou entrega o erro 400
        if not (0 <= avaliacao <= 10):
            return JsonResponse(
                {"erro": "A avaliação precisa estar entre 0 e 10."}, status=400
            )

        if not (1900 <= ano <= 2026):
            return JsonResponse(
                {"erro": "O ano precisa estar entre 1900 e 2026."}, status=400
            )

        # deu certo salva + status 201 de confirmação
        serie = Serie.objects.create(
            titulo=titulo,
            plataforma=plataforma,
            ano=ano,
            avaliacao=avaliacao,
        )
        return JsonResponse({"id": serie.id}, status=201)

    # lista
    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)


def resumo_series(request):
    series = Serie.objects.all()
    total = len(series)

    # sem series
    if total == 0:
        return JsonResponse({"total": 0, "media_avaliacao": 0, "melhor": None})

    # começa a soma e pega a primeira serie como melhor
    soma = 0
    melhor_nota = series[0].avaliacao
    melhor_titulo = series[0].titulo

    for serie in series:
        soma = soma + serie.avaliacao
        if serie.avaliacao > melhor_nota:
            melhor_nota = serie.avaliacao
            melhor_titulo = serie.titulo

    media = round(soma / total, 2)

    return JsonResponse(
        {"total": total, "media_avaliacao": media, "melhor": melhor_titulo}
    )