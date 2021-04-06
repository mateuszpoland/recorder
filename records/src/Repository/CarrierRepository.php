<?php
declare(strict_types=1);

namespace Records\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Records\Entity\Carrier;
use Records\Entity\CarrierInterface;

class CarrierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Carrier::class);
    }

    public function save(CarrierInterface $carrier): void
    {
        $this->_em->persist($carrier);
        $this->_em->flush();
    }

    public function update(): void
    {
        $this->_em->flush();
    }

    public function remove(CarrierInterface $carrier): void
    {
        $this->_em->remove($carrier);
        $this->_em->flush();
    }
}
