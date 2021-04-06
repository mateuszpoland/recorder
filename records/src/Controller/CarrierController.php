<?php
declare(strict_types=1);

namespace Records\Controller;

use Records\Factory\CarrierFactory;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Records\Repository\CarrierRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

/**
 * @Route("/carrier", name="recorder_carrier_")
 */
class CarrierController extends BaseController
{
    /**
     * @Route("/getAll", name="get_all")
     */
    public function getCarriers(CarrierRepository $carrierRepository): Response
    {
        $carriers = $carrierRepository->findAll();
        $serializer = $this->getJsonSerializer();
        $normalized = $serializer->normalize($carriers, null, [AbstractNormalizer::ATTRIBUTES => [
            'carrierType', 'id', 'artist', 'title', 'release_date', 'tracks' => ['id', 'title', 'artist']
        ]]);

        return new JsonResponse($normalized, Response::HTTP_OK);
    }

    /**
     * @Route("/add", name="add_new")
     */
    public function addCarrier(
        Request $request,
        CarrierFactory $carrierFactory,
        CarrierRepository $carrierRepository
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $carrier = $carrierFactory->createCarrier($data['carrier_type']);

        $carrier = $carrier->fillData(
            $data['title'],
            new \DateTime(),
            $data['artist']
        );
        $carrierRepository->save($carrier);

        return new JsonResponse($carrier->getId(), Response::HTTP_CREATED);
    }

    /**
     * @Route("/{carrierId}/edit", name="edit", requirements={"carrierId"="\d+"})
     */
    public function editCarrier(
        int $carrierId,
        CarrierRepository $carrierRepository,
        Request $request
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $carrier = $carrierRepository->find($carrierId);

        if(!$carrier) {
            return new JsonResponse(sprintf('carrier of id %s not found', $carrierId), Response::HTTP_BAD_REQUEST);
        }

        $carrier->updateData($data['title'], $data['artist']);
        $carrierRepository->update();

        return new JsonResponse(null, Response::HTTP_OK);
    }

    /**
     * @Route("/{carrierId}/delete", methods={"DELETE"}, requirements={"carrierId"="\d+"})
     */
    public function deleteCarrier(int $carrierId, CarrierRepository $carrierRepository): JsonResponse
    {
        $carrier = $carrierRepository->find($carrierId);
        if(!$carrier) {
            return new JsonResponse(sprintf('carrier of id %s not found', $carrierId), Response::HTTP_BAD_REQUEST);
        }

        $carrierRepository->remove($carrier);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
