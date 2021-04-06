<?php
declare(strict_types=1);

namespace Records\Controller;

use Records\Entity\Track;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Records\Repository\CarrierRepository;
use Symfony\Component\Routing\Annotation\Route;
use Records\Repository\TrackRepository;

/**
 * @Route("/tracks", name="recorder_tracks_")
 */
class TrackController extends BaseController
{
    /**
     * @Route("/getByCarrier/{carrierId}", methods={"GET"}, requirements={"carrierId"="\d+"})
     */
    public function getTracksForCarrier(TrackRepository $trackRepository, int $carrierId): JsonResponse
    {
        $tracks = $trackRepository->findAllTracksForCarrier($carrierId);
        //dump($tracks);
        $serializer = $this->getJsonSerializer();

        return new JsonResponse($serializer->normalize($tracks), Response::HTTP_OK);
    }

    /**
     * @Route("/{trackId}", methods={"GET"}, requirements={"trackId"="\d+"})
     */
    public function getTrack(TrackRepository $trackRepository, int $trackId): JsonResponse
    {
        $track = $trackRepository->find($trackId);
        $serializer = $this->getJsonSerializer();

        return new JsonResponse($serializer->normalize($track), Response::HTTP_OK);
    }

    /**
     * @Route("/{carrierId}/add", name="add_new", methods={"POST"}, requirements={"carrierId"="\d+"})
     */
    public function addTrack(
        Request $request,
        int $carrierId,
        CarrierRepository $carrierRepository
    ): JsonResponse
    {
        $carrier = $carrierRepository->find($carrierId);
        if(!$carrier) {
            return new JsonResponse('Carrier Not found. Cannot add track.', Response::HTTP_BAD_REQUEST);
        }
        $data = json_decode($request->getContent(), true);
        $track = new Track($data['title'], $data['artist']);
        $carrier->addTrack($track);
        $carrierRepository->update();

        // simple HATEOAS, to avoid over-fetching whole dataset on front-end
        return new JsonResponse([
            'id' =>  $track->getId(),
            'rel' => [
                'href' => '/tracks/' . $track->getId(),
                'method' => 'GET'
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route("/{trackId}/delete", methods={"DELETE"}, requirements={"carrierId"="\d+"})
     */
    public function deleteTrack(int $trackId, TrackRepository $trackRepository): JsonResponse
    {
        $track = $trackRepository->find($trackId);
        if(!$track) {
            return new JsonResponse(sprintf('track of id %s not found', $trackId), Response::HTTP_BAD_REQUEST);
        }

        $trackRepository->remove($track);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
