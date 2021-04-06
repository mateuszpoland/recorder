<?php
declare(strict_types=1);

namespace Records\Entity;
use Doctrine\ORM\Mapping as ORM;
use Records\Repository\TrackRepository;

/**
 * @ORM\Entity(repositoryClass=TrackRepository::class)
 */
class Track
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string")
     */
    private string $title;

    /**
     * @ORM\Column(type="string")
     */
    private string $artist;

    /**
     * @ORM\ManyToOne(targetEntity="Carrier", inversedBy="tracks")
     * @ORM\JoinColumn(name="carrier_id", referencedColumnName="id", nullable=false)
     */
    private CarrierInterface $carrier;

    public function __construct(string $title, string $artist)
    {
        $this->title = $title;
        $this->artist = $artist;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getArtist(): string
    {
        return $this->artist;
    }

    public function setCarrier(CarrierInterface $carrier): void
    {
        $this->carrier = $carrier;
    }
}
