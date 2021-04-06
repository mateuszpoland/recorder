<?php
declare(strict_types=1);

namespace Records\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Persistence\ManagerRegistry;
use Records\Entity\CarrierInterface;
use Records\Entity\Track;
use function Doctrine\ORM\QueryBuilder;

class TrackRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Track::class);
    }

    public function save(Track $track): void
    {
        $this->_em->persist($track);
        $this->_em->flush();
    }

    public function update(): void
    {
        $this->_em->flush();
    }

    public function remove(Track $track): void
    {
        $this->_em->remove($track);
        $this->_em->flush();
    }

    public function findAllTracksForCarrier(int $carrierId): array
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('t')
            ->from(Track::class, 't')
            ->where(
            $qb->expr()->eq('t.carrier', ':id')
        );
        $qb->setParameter('id', $carrierId);

        return $qb->getQuery()->getResult();
    }
}
