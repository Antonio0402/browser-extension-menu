<?php

namespace App\Controller;

use App\Repository\ExtensionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/extensions/v1')]
class ExtensionAPIController extends AbstractController
{
    #[Route('/toggle/{name}', name: 'app_extension_toggle', methods: ['PATCH'])]
    public function toggleExtension(
        string $name,
        ExtensionRepository $extensionRepository,
    ): JsonResponse {
        $extension = $extensionRepository->findOneByName($name);

        if (!$extension) {
            //            throw $this->createNotFoundException();
            return $this->json(['error' => 'Extension not found'], 404);
        }
        $extension->setIsActive(!$extension->isActive());
        $extensionRepository->updateSingle($extension);

        return $this->json(['success' => true, 'isActive' => $extension->isActive()]);
    }

    #[Route('/remove/{name}', name: 'app_extension_remove', methods: ['DELETE'])]
    public function removeExtension(
        string $name,
        ExtensionRepository $extensionRepository,
    ): JsonResponse {
        $extension = $extensionRepository->findOneByName($name);
        if (!$extension) {
            //            throw $this->createNotFoundException();
            return $this->json(['error' => 'Extension not found'], 404);
        }

        $extensionRepository->removeSingle($extension);

        return $this->json(['success' => true, 'removed' => $extension->getName()]);
    }
}
