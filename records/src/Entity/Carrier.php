<?php
declare(strict_types=1);

namespace Records\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Records\Repository\CarrierRepository;

/**
 * @ORM\Entity(repositoryClass=CarrierRepository::class)
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="carrier_type", type="string")
 * @ORM\DiscriminatorMap({"vinyl" = "VinylCarrier", "cd" = "CDCarrier", "mp3" = "Mp3Carrier"})
 */
abstract class Carrier implements CarrierInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private string $artist;

    /**
     * @ORM\Column(type="string")
     */
    private string $title;

    /**
     * @ORM\Column(type="datetime")
     */
    private \DateTime $releaseDate;

    /**
     * @ORM\OneToMany(targetEntity="Track", mappedBy="carrier", cascade={"persist", "remove"})
     */
    private Collection $tracks;

    public function __construct()
    {
        $this->tracks = new ArrayCollection();
    }

    public function addTrack(Track $track) {
        if(!$this->tracks->contains($track)) {
            $this->tracks->add($track);
            $track->setCarrier($this);
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArtist(): string
    {
        return $this->artist;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getReleaseDate(): \DateTime
    {
        return $this->releaseDate;
    }

    public function getTracks(): Collection
    {
        return $this->tracks;
    }

    public function fillData(string $title, \DateTime $releaseDate, ?string $artist = null): self
    {
        $instance = clone $this;

        $instance->artist = $artist ?? '';
        $instance->title = $title;
        $instance->releaseDate = $releaseDate;

        return $instance;
    }

    public function updateData(?string $title=null, ?string $artist=null, ?string $updateDate=null): void
    {
        if($updateDate) {
            $updateDate = \DateTime::createFromFormat('Y-m-d', $updateDate);
        }
        $this->title = $title ?? $this->title;
        $this->artist = $artist ?? $this->artist;
        $this->releaseDate = $updateDate ?? $this->releaseDate;
    }

    abstract public function getCarrierType(): string;
}
