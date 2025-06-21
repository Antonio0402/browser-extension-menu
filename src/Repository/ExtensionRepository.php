<?php

namespace App\Repository;

use App\Model\Extension;

class ExtensionRepository
{
    private array $extensions = [];
    private string $currentFilePath = '';

    public function __construct(string $jsonFilePath)
    {
        $this->currentFilePath = $jsonFilePath;
        $json = file_get_contents($jsonFilePath);
        $this->extensions = json_decode($json, true) ?? [];
    }

    public function findAll(): array
    {
        return array_map(
            function ($extension) {
                return new Extension(
                    $extension['logo'] ?? 'Unknown',
                    $extension['name'] ?? '0.0.0',
                    $extension['description'] ?? 'No description available',
                    $extension['isActive'] ?? false,
                );
            },
            $this->extensions
        );
    }

    public function findActive(): array
    {
        return array_filter($this->findAll(), function ($extension) {
            return $extension->isActive();
        });
    }

    public function findInactive(): array
    {
        return array_filter($this->findAll(), function ($extension) {
            return !$extension->isActive();
        });
    }

    public function findOneByName(string $name): ?Extension
    {
        foreach ($this->findAll() as $extension) {
            if (strtolower($extension->getName()) === $name) {
                return $extension;
            }
        }

        return null;
    }

    public function updateSingle(Extension $extension): void
    {
        foreach ($this->extensions as &$ext) {
            if (strtolower($ext['name']) === $extension->getName()) {
                $ext['isActive'] = $extension->isActive();
                break;
            }
        }
        file_put_contents($this->currentFilePath, json_encode($this->extensions, JSON_PRETTY_PRINT));
    }

    public function removeSingle(Extension $extension): void
    {
        foreach ($this->extensions as $key => $ext) {
            if (strtolower($ext['name']) === $extension->getName()) {
                unset($this->extensions[$key]);
                break;
            }
        }
        file_put_contents($this->currentFilePath, json_encode(array_values($this->extensions), JSON_PRETTY_PRINT));
    }
}
